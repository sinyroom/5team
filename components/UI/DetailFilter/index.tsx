import Image from 'next/image';
import styles from './DetailFilter.module.css';
import buttonStyles from '@/components/common/BaseButton/BaseButton.module.css';
import { TextInput } from '@/components/common/inputs/TextInput';
import { useState } from 'react';
import { NumberInput } from '@/components/common/inputs/NumberInput';
import { DROPDOWN_OPTIONS_MAP } from '@/constants/DropdownOptions';

interface DetailFilterProps {
	onClose: () => void;
}

const DetailFilter = ({ onClose }: DetailFilterProps) => {
	const [startsAtGte, setStartsAtGte] = useState('');
	const [hourlyPayGte, setHourlyPayGte] = useState('');
	const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);

	const options = DROPDOWN_OPTIONS_MAP['주소'];

	const handleAddressClick = (address: string) => {
		if (!selectedAddresses.includes(address)) {
			setSelectedAddresses(prev => [...prev, address]);
		}
	};

	const handleRemoveAddress = (address: string) => {
		setSelectedAddresses(prev => prev.filter(item => item !== address));
	};

	return (
		<div className={styles.container}>
			<div className={styles.withoutButtons}>
				<div className={styles.titleWrapper}>
					<span className={styles.title}>상세 필터</span>
					<Image
						src="/img/icon/closeIcon.svg"
						alt="상세필터 닫기"
						width={24}
						height={24}
						onClick={onClose}
						style={{ cursor: 'pointer' }}
					/>
				</div>
				<div className={styles.gap2x}>
					<div className={styles.gap}>
						<span className={styles.secTitle}>위치</span>
						<div className={styles.scroller}>
							<ul>
								{options.map((item, idx) => (
									<li key={idx} onClick={() => handleAddressClick(item)}>
										{item}
									</li>
								))}
							</ul>
						</div>

						<div className={styles.selected}>
							{selectedAddresses.map((address, idx) => (
								<div key={idx} className={styles.selectedItem}>
									<span>{address}</span>
									<div className={styles.close} onClick={() => handleRemoveAddress(address)}>
										<img src="/img/icon/closeIcon.svg" alt="주소선택 취소" />
									</div>
								</div>
							))}
						</div>
					</div>

					<div className={styles.devider}></div>
					<div className={styles.gap2x}>
						<TextInput
							id="startAtGte"
							label="시작일"
							value={startsAtGte}
							onChange={e => setStartsAtGte(e.target.value)}
							placeholder="입력"
						/>
					</div>
					<div className={styles.devider}></div>
					<div className={styles.payWrapper}>
						<div className={styles.pay}>
							<NumberInput
								id="hourlyPayGte"
								label="금액"
								value={hourlyPayGte}
								onChange={value => setHourlyPayGte(value)}
								placeholder="10000"
								unitText="원"
							/>
						</div>
						<span className={styles.unit}>이상부터</span>
					</div>
				</div>
			</div>
			<div className={styles.buttons}>
				<button className={`${buttonStyles.white} ${styles.reset}`}>초기화</button>
				<button className={`${buttonStyles.red} ${styles.confirm}`}>적용하기</button>
			</div>
		</div>
	);
};

export default DetailFilter;
