import React from 'react'

function Table() {
    return (
        <div className="overflow-x-auto">
            <h1 className='text-center mt-4 mb-4'>Members</h1>
            <table className="min-w-full divide-y divide-gray-200">

                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            First Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gender
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Home cell
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Unit
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Detail
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {
                        members.map(member =>

                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={member.id} >
                                <td scope="row" className="px-6 py-4 whitespace-nowrap">
                                    {member.first_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {member.last_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {member.gender}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {member.phone_number}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {member.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {member.homecell_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {member.unit_names.map(unit => <li key={unit} className=''>{unit}</li>)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <MoreButton page='members' id={member.id} buttonText='View' />
                                </td>

                            </tr>

                        )
                    }

                </tbody>
            </table>
        </div>

    )
}

export default Table