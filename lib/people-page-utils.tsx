import { DepartmentRecord, PersonRecord } from 'types'

interface FilterArgs {
	allPeople: PersonRecord[]
	selectedDepartment?: string | null
	hideWithoutImage: boolean
	searchTerm: string
}

export const getRootDepartments = (departments: DepartmentRecord[]) => {
	return departments.filter((dept) => !dept.parent)
}

export const getFilteredPeople = ({
	allPeople,
	selectedDepartment,
	hideWithoutImage,
	searchTerm,
}: FilterArgs) => {
	return allPeople.filter(
		(person) =>
			person.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(!hideWithoutImage || (person.avatar && person.avatar.url)) &&
			(!selectedDepartment ||
				(person.department && person.department.name === selectedDepartment))
	)
}
