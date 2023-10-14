import React from 'react'
import style from './style.module.css'
import { DepartmentRecord } from 'types'

interface DepartmentProps {
	department: DepartmentRecord
	allDepartments: DepartmentRecord[]
	expandedDepartments: string[]
	onToggle: (deptName: string) => void
	onSelect: (deptName: string) => void
}

const Department: React.FC<DepartmentProps> = ({
	department,
	allDepartments,
	expandedDepartments,
	onToggle,
	onSelect,
}) => {
	const getChildDepartments = (
		parentId: string,
		departments: DepartmentRecord[]
	): DepartmentRecord[] => {
		return departments.filter(
			(dept) => dept.parent && dept.parent.id === parentId
		)
	}

	const renderDepartment = (dept: DepartmentRecord, level = 0) => {
		const isExpanded = expandedDepartments.includes(dept.name)
		const children = getChildDepartments(dept.id, allDepartments)

		return (
			<React.Fragment>
				<div
					key={dept.id}
					className={`${style.departmentItem} ${
						children.length > 0 ? style.hasChildren : ''
					} ${isExpanded ? style.expanded : ''} ${
						style[`menu-level-${level}`]
					}`}
					onClick={() => {
						onSelect(dept.name)
						onToggle(dept.name)
					}}
				>
					{dept.name}
				</div>
				{isExpanded &&
					children.map((childDept) => renderDepartment(childDept, level + 1))}
			</React.Fragment>
		)
	}

	return renderDepartment(department)
}

export default Department
