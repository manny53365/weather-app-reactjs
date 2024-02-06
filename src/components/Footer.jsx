import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles['footer']}>
        <p> 
            © Manny53365 {new Date().getFullYear()} 
            <a href="https://github.com/manny53365" target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faGithub} />
            </a>
        </p>
    </div>
  )
}
