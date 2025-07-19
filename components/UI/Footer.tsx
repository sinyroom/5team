import Image from 'next/image';
import messageIcon from '@/assets/img/messageIcon.png';
import facebookIcon from '@/assets/img/facebookIcon.png';
import instagramIcon from '@/assets/img/instagramIcon.png';
import styles from './Footer.module.css';

export default function Footer() {
	return (
		<>
			<div className={styles.Footer}>
				<div>©codeit - 2023</div>
				<div>
					<div>Privacy Policy</div>
					<div>FAQ</div>
				</div>
				<div>
					<Image src={messageIcon} alt="메세지 아이콘" />
					<Image src={facebookIcon} alt="페이스북 아이콘" />
					<Image src={instagramIcon} alt="인스타그램 아이콘" />
				</div>
				<button>dfdf</button>
			</div>
		</>
	);
}
