'use client'


export const ClientTester = ({testString, children} : {testString: string | any, children?: React.ReactNode}) => {
console.log(testString, "Client Tester Log")
    return (
        <div>
            {JSON.stringify(testString)}
            {children}
        </div>
    )
}