// import Image from 'next/image'; /* 이거 쓰면 css hover의 컬러 변환이 안이루어짐 */
import Link from 'next/link';
import MessageIcon from '@/assets/img/messageIcon.svg';
import FacebookIcon from '@/assets/img/facebookIcon.svg';
import InstagramIcon from '@/assets/img/instagramIcon.svg';

import styles from './Footer.module.css';

export default function Footer() {
	return (
		<>
			<div className={styles.Footer}>
				<div className={styles.FooterContents}>
					<div>©codeit - 2023</div>
					<div className={styles.Policies}>
						<Link href="/">Privacy Policy</Link>
						<Link href="/">FAQ</Link>
					</div>
					<div className={styles.ImgDiv}>
						<p>
							<a href="https://www.google.com" target="_blank">
								<MessageIcon className={styles.messageIcon} />
							</a>
						</p>
						<p>
							<a href="https://www.facebook.com" target="_blank">
								<FacebookIcon className={styles.facebookIcon} />
							</a>
						</p>
						<p>
							<a href="https://www.instagram.com" target="_blank">
								<InstagramIcon className={styles.instagramIcon} />
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
