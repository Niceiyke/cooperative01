import React from 'react'

async function FetchMembers() {
    const res = await fetch('http://127.0.0.1:8000/api/members/')

    if (res.ok) {
        console.log('successfull')
        console.log(res.body)

    }
    else {
        //console.log(res)
    }


    return (
        <div>FetchMembers</div>
    )
}

export default FetchMembers