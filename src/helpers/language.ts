import { getLangCookie, setLangCookie } from "@/modules/locale/locale";
import { StorageClass } from "@/services/storage-service";

export class TranslationInit {
  public static CurrentTranslation: any = {};
  public static BackUpTranslation: any = {};
  public static IsSet: Boolean = false;
  public storage = StorageClass.getInstance();
  private static instance: TranslationInit;
  public static CLang: any;

  constructor() {
    this.storage = StorageClass.getInstance();
  }

  public static GetParsedTranslation() {
    while (!TranslationInit.IsSet) {
      TranslationInit.SetForParsingTranslationAuto();
    }
    return {
      CTranslation: TranslationInit.CurrentTranslation,
      BackupTransl: TranslationInit.BackUpTranslation,
    };
  }

  //Set the cashed translation for the app
  public static async SetForParsingTranslationAuto() {
    const storage = StorageClass.getInstance();
    const appLang = await storage.tryGet("appLang");
    const appLangBackup = await storage.tryGet("appLangBackUp");

    if (appLang.hasValue && appLangBackup.hasValue) {
      TranslationInit.CurrentTranslation = JSON.parse(appLang.value!);
      TranslationInit.BackUpTranslation = JSON.parse(appLangBackup.value!);
      TranslationInit.IsSet = true;
    }
  }

  public static getMessageTranslation(key: any, counter?: any): any {
    if (!key || /\s/.test(key)) {
      return key;
    }

    if (!TranslationInit.IsSet) {
      this.SetForParsingTranslationAuto();
    }

    // Check if the key is in the CurrentTranslation map
    const currentTranslation =
      TranslationInit.CurrentTranslation[key.toLowerCase()];
    if (currentTranslation !== undefined) {
      return currentTranslation;
    }

    const backupTranslation =
      TranslationInit.BackUpTranslation[key.toLowerCase()];
    if (backupTranslation !== undefined) {
      return backupTranslation;
    }
    return key;
  }

  public static SetForParsingTranslation(CT: any, BT: any) {
    if (CT === null || CT === undefined || BT === null || BT === undefined) {
      TranslationInit.IsSet = false;
      return;
    } else {
      TranslationInit.CurrentTranslation = CT;
      TranslationInit.BackUpTranslation = BT;

      TranslationInit.IsSet = true;
    }
  }
  public static async getTranslation(
    getlang: string,
    isChangLang: boolean,
    init: boolean = false
  ) {
    const storage = StorageClass.getInstance();
    const aplang = await storage.tryGet("appLang");

    if (
      (!aplang.hasValue && isChangLang === false) ||
      (aplang.hasValue && isChangLang === true) ||
      init
    ) {
      try {
        const responsePromises = [
          fetch(
            process.env.NEXT_PUBLIC_EXCHANGE_BACKEND_BASE_URL! +
              "/locale/get-translation?PrefLang=" +
              getlang
          ).then((res) => res.json()),
          fetch(
            process.env.NEXT_PUBLIC_EXCHANGE_BACKEND_BASE_URL! +
              "/locale/get-translation?PrefLang=" +
              getlang +
              "&Platform=1"
          ).then((res) => res.json()),
        ];
        const [response, responsePlatform1] = await Promise.all(
          responsePromises
        );
        if (
          response["Error"] === undefined &&
          responsePlatform1["Error"] === undefined
        ) {
          if (
            Object.keys(response["Translation"]).length > 0 &&
            Object.keys(responsePlatform1["Translation"]).length > 0
          ) {
            const appLang = {
              ...response["Translation"],
              ...responsePlatform1["Translation"],
            };
            const appLangBackUp = {
              ...response["BackUpTranslation"],
              ...responsePlatform1["BackUpTranslation"],
            };
            this.CLang = getlang;
            setLangCookie(getlang);
            storage.set("appLang", JSON.stringify(appLang));
            storage.set("appLangBackUp", JSON.stringify(appLangBackUp));
            TranslationInit.SetForParsingTranslation(appLang, appLangBackUp);
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error:", error);
        return false;
      }
    } else {
      let clang = getLangCookie();
      this.CLang = clang ? clang : "en";
    }
  }
  public static getCurrentLanguage() {
    return this.CLang;
  }

  public static async getLanguages() {
    const storage = StorageClass.getInstance();

    try {
      const response = await (
        await fetch(
          process.env.NEXT_PUBLIC_EXCHANGE_BACKEND_BASE_URL! +
            "/locale/get-languages"
        )
      ).json();
      if (response["Error"] === undefined) {
        storage.set("activelang", JSON.stringify(response));
        return response;
      }
    } catch (error) {
      throw new Error("Error: fetch languages error");
    }
  }
  public static IsTransSet() {
    return TranslationInit.IsSet;
  }
}
