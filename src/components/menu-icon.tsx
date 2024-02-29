import styles from './menu-icon.module.css'

interface MenuIconProps {
    icon: any;
}

export function MenuIcon({ icon } : MenuIconProps) {
    return <div className={styles.menuIcon}>{ icon }</div>
}