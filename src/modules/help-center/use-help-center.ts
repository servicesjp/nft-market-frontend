export default function useHelpCenter() {
  // should be read from an atom or state once the language selector is implemented
  const currentLocale = 'en-us'

  const helpCenterUrl = 'https://helpcenter.themeteor.io'

  const openHelpCenter = () => {
    window.open(helpCenterUrl, '_blank')
  }

  const getHelpCenterArticleLink = (article: HelpCenterArticles) => {
    return `https://helpcenter.themeteor.io/hc/${currentLocale}/articles/${article}`
  }

  const contactFormUrl = `https://helpcenter.themeteor.io/hc/${currentLocale}/requests/new`

  return {
    openHelpCenter,
    contactFormUrl,
    helpCenterUrl,
    getHelpCenterArticleLink
  }
}

export enum HelpCenterArticles {
  aboutKYC = '16537341388059-FAQ-Individual-KYC'
}