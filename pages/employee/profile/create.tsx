import { useState } from 'react';
import Image from 'next/image';
import buttonStyle from '@/components/common/BaseButton/BaseButton.module.css';
import styles from './create.module.css';

import { TextInput } from '@/components/common/inputs/TextInput';
import { DropdownInput } from '@/components/common/inputs/DropdownInput';
import { TextareaInput } from '@/components/common/inputs/TextareaInput';
import Alert from '@/components/Modal/Alert/Alert';

const Create = () => {
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [bio, setBio] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsAlertOpen(true);
	};

	const handleAlertClose = () => {
		setIsAlertOpen(false);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.titleWrapper}>
					<p className={styles.title}>내 프로필</p>
					<Image src="/img/icon/closeIcon.svg" alt="프로필 닫기" width={24} height={24} />
				</div>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.inputWrapper}>
						<div className={styles.input}>
							<TextInput
								id="name"
								label="이름"
								value={name}
								onChange={e => setName(e.target.value)}
								placeholder="입력"
								required
								// error={!name ? '카테고리를 선택해주세요' : ''}
							/>
						</div>
						<div className={styles.input}>
							<TextInput
								id="phone"
								label="연락처"
								value={phone}
								onChange={e => setPhone(e.target.value)}
								placeholder="입력"
								required
							/>
						</div>
						<div className={styles.input}>
							<DropdownInput
								id="address"
								label="선호 지역"
								value={address}
								onSelectOption={value => setAddress(value)}
								placeholder="선택"
								// error={!address ? '카테고리를 선택해주세요' : ''}
							/>
						</div>
					</div>
					<div>
						<TextareaInput
							id="bio"
							label="소개"
							value={bio}
							onChange={e => setBio(e.target.value)}
							placeholder="입력"
							// error={!bio ? '카테고리를 선택해주세요' : ''}
						/>
					</div>
					<div className={styles.buttonWrapper}>
						<button
							type="submit"
							className={`${buttonStyle.button} ${buttonStyle.red} ${styles.button}`}
						>
							등록하기
						</button>
					</div>
				</form>

				<Alert
					isOpen={isAlertOpen}
					message="등록이 완료되었습니다."
					onConfirm={handleAlertClose}
					onClose={handleAlertClose}
				></Alert>
			</div>
		</>
	);
};

export default Create;
