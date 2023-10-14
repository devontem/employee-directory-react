import rivetQuery from '@hashicorp/platform-cms'
import { GetStaticPropsResult } from 'next'
import { PersonRecord, DepartmentRecord } from 'types'
import BaseLayout from '../../layouts/base'
import style from './style.module.css'
import query from './query.graphql'
import React, { useState } from 'react'

interface Props {
	allPeople: PersonRecord[]
	allDepartments: DepartmentRecord[]
}

const PersonCard: React.FC<PersonRecord> = ({ name }) => (
	<div className={style.personCard}>
		<h3>{name}</h3>
	</div>
)

export default function PeoplePage({
	allPeople,
	allDepartments,
}: Props): React.ReactElement {
	const [searchTerm, setSearchTerm] = useState('')

	const filteredPeople = allPeople.filter((person) =>
		person.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div>
			<div className={style['header-container']}>
				<div className={style.header}>HashiCorp Humans</div>
				<input
					type="text"
					placeholder="Search people by name"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className={style['search-input']}
				/>
			</div>
			<div className={style.container}>
				<main className={style.peopleList}>
					{filteredPeople.map((person) => (
						<PersonCard key={person.name} {...person} />
					))}
				</main>
			</div>
		</div>
	)
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
	const data = await rivetQuery({ query })
	return { props: data }
}

PeoplePage.layout = BaseLayout
