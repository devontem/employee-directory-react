import { DepartmentRecord } from 'types'

export const getRootDepartments = (departments: DepartmentRecord[]) => {
	return departments.filter((dept) => !dept.parent)
}

export const getFilteredPeople = ({
	allPeople,
	selectedDepartment,
	hideWithoutImage,
	searchTerm,
}) => {
	return allPeople.filter(
		(person) =>
			person.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(!hideWithoutImage || (person.avatar && person.avatar.url)) &&
			(!selectedDepartment ||
				(person.department && person.department.name === selectedDepartment))
	)
}
