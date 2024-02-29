// import Launchpad from "@/assets/icons/menu/launchpad.svg";
// // import CryptoLoan from "@/assets/icons/menu/crypto-loan.svg";
// // import CopyTrading from "@/assets/icons/menu/copy-trade.svg";
// // import Cards from "@/assets/icons/menu/cards.svg";
// import Task from '@/assets/icons/menu/reward.svg'
// import Vote from '@/assets/icons/menu/vote.svg'
// import Lottery from '@/assets/icons/menu/lottery.svg'
// import Roul from '@/assets/icons/menu/roule.svg'
// import SpotIcon from '@/assets/icons/menu/spot-wallet.svg'
// import DerivativeIcon from '@/assets/icons/menu/derivatives.svg'
// import WalletIcon from '@/assets/icons/menu/overview.svg'
// import TransactionsIcon from '@/assets/icons/menu/transaction.svg'
// import Market from "@/assets/icons/menu/market.svg";
// import Derivative from "@/assets/icons/menu/derivatives.svg";
// import AfiliateProgram from "@/assets/icons/menu/afiliate-program.svg";
// import TransactionsFee from "@/assets/icons/menu/transactions-fee.svg";
// // import Blog from "@/assets/icons/menu/blog.svg";
// import AccountSecurity from "@/assets/icons/menu/accountsecurity.svg";
// import Wallet from "@/assets/icons/menu/connect-wallet.svg";
// import Help from "@/assets/icons/menu/help.svg";
// import Vip from "@/assets/icons/menu/vip.svg";
// import Logout from "@/assets/icons/menu/logout.svg";
// import Notification from "@/assets/icons/menu/notification-new.svg";
import MetaWallet from "@/assets/menu/metamask-meteor.svg";
import Logout from "@/assets/menu/logout.svg";
import LocaleIcon from "@/assets/icons/menu/locale-icon.svg";

const PAGES = {
	HOME: {
		id: "home",
		name: "Home",
		path:"/"
	},
	MARKETPLACE: {
		id: "marketplace",
		name: "Marketplace",
		path:"/marketplace/experience"
	},
	ACCOUNT: {
		id: "account",
		name: "my_nfts",
		path: null,
		trigger: true,
	},

	BLOG: {
		id: "blog",
		name: "Blog",
		path: "/blogs"
	},
	PROFILE: {
		id: "profile",
		name: "Settings",
		child: [
			{ id: "wallet-connect", name: "connect_wallet",  icon: <MetaWallet />, wallet: false, trigger: true },
			{ id: "wallet-disconnect", name: "disconnect_wallet", icon: <MetaWallet />, wallet: true, trigger: true },
			{ id: "logout", name: "Logout", trigger: true, icon: <Logout /> },
		]
	},
	MOBILE_PROFILE: {
		id: "profile",
		name: "Settings",
		child: [
			{ id: "wallet-connect", name: "connect_wallet", wallet: false, trigger: true ,  icon: <MetaWallet />},
			{ id: "logout", name: "Logout", trigger: true,  icon: <Logout /> },
		]
	},
	LOCALE: {
		id: "locale",
		name: "-",
		trigger: true,
		icon: <LocaleIcon /> 
	}

};


export const EMenu = {
  PAGES: [
		PAGES.HOME,
		PAGES.MARKETPLACE,
		PAGES.ACCOUNT
  ],
  MOBILE_PAGES: [
		PAGES.HOME,
		PAGES.MARKETPLACE,
		PAGES.ACCOUNT,
	]
};

export const ELoginMenu = {
  PAGES: [
		PAGES.PROFILE
	],
  MOBILE_PAGES: [
		PAGES.MOBILE_PROFILE,	
	]
}

export const EProfileMenu = {
	id: "profile",
	name: "Settings",
	child: [
		{ id: "profile-profile", path: "/account", name: "account_and_security" },
		{ id: "profile-vip", path: "/vip", name: "VIP" },
		{ id: "profile-notifications", path: "/notifications", name: "Notification" },
	]
}
