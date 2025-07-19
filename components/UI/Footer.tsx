import Image from 'next/image';
import Link from 'next/link';
import messageIcon from '@/assets/img/messageIcon.png';
import facebookIcon from '@/assets/img/facebookIcon.png';
import instagramIcon from '@/assets/img/instagramIcon.png';
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
								<Image src={messageIcon} alt="메세지 아이콘" />
							</a>
						</p>
						<p>
							<a href="https://www.facebook.com" target="_blank">
								<Image src={facebookIcon} alt="페이스북 아이콘" />
							</a>
						</p>
						<p>
							<a href="https://www.instagram.com" target="_blank">
								<Image src={instagramIcon} alt="인스타그램 아이콘" />
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
