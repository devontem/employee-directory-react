import rivetQuery from '@hashicorp/platform-cms'
import { GetStaticPropsResult } from 'next'
import { PersonRecord, DepartmentRecord } from 'types'
import BaseLayout from '../../layouts/base'
import style from './style.module.css'
import query from './query.graphql'
import React, { useState } from 'react'
import PersonCard from './../../components/PersonCard'
import Department from './../../components/Department'

interface Props {
	allPeople: PersonRecord[]
	allDepartments: DepartmentRecord[]
}

export default function PeoplePage({
	allPeople,
	allDepartments,
}: Props): React.ReactElement {
	const [searchTerm, setSearchTerm] = useState('')
	const [hideWithoutImage, setHideWithoutImage] = useState(false)
	const [expandedDepartments, setExpandedDepartments] = useState<string[]>([])
	const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
		null
	)

	const toggleDepartment = (deptName: string) => {
		setExpandedDepartments((prevState) =>
			prevState.includes(deptName)
				? prevState.filter((d) => d !== deptName)
				: [...prevState, deptName]
		)
	}

	const filteredPeople = allPeople.filter(
		(person) =>
			person.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(!hideWithoutImage || (person.avatar && person.avatar.url)) &&
			(!selectedDepartment ||
				(person.department && person.department.name === selectedDepartment))
	)

	const getRootDepartments = (departments: DepartmentRecord[]) => {
		return departments.filter((dept) => !dept.parent)
	}

	return (
		<div>
			<div className={style['header-container']}>
				<div className={style.header}>HashiCorp Humans</div>
				<div className={style.subheader}>Find a HashiCorp human</div>
				<input
					type="text"
					placeholder="Search people by name"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className={style['search-input']}
				/>
				<div className={style['checkbox-container']}>
					<input
						type="checkbox"
						checked={hideWithoutImage}
						onChange={() => setHideWithoutImage(!hideWithoutImage)}
					/>
					<label htmlFor="hideProfile">
						Hide people missing a profile image
					</label>
				</div>
			</div>
			<div className={style.container}>
				<aside className={style.sidebar}>
					<h2>Filter By Department</h2>
					{getRootDepartments(allDepartments).map((dept) => (
						<Department
							key={dept.id}
							department={dept}
							allDepartments={allDepartments}
							expandedDepartments={expandedDepartments}
							onToggle={toggleDepartment}
							onSelect={setSelectedDepartment}
						/>
					))}
				</aside>
				<main className={style.peopleList}>
					{filteredPeople.map((person) => (
						<PersonCard
							key={person.name}
							name={person.name}
							avatar={person.avatar}
							department={person.department?.name}
						/>
					))}

					{!filteredPeople.length ? 'No results found.' : ''}
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
