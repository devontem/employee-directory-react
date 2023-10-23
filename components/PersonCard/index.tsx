import React from 'react'
import style from './style.module.css'

interface PersonCardProps {
	name: string
	avatar: { url?: string } | null
	department: string | null
}

const PersonCard: React.FC<PersonCardProps> = ({
	name,
	avatar,
	department,
}) => (
	<div className={style.personCard}>
		{avatar && avatar.url && (
			<img src={avatar.url} alt={name} className={style.personImage} />
		)}
		<h3>{name}</h3>
		{department && <p>{department}</p>}
	</div>
)

export default PersonCard
