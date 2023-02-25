export const Terminal = () => {
    return (
        <div style={{borderTop: '1px solid whitesmoke', backgroundColor: 'var(--clr-bg)'}}>
            <p style={{textDecoration: 'underline'}}>TERMINAL</p>

            <div>
                {"visitor@leviterry.dev>"} 
                <form onSubmit={onSubmit}>
                    <textarea name="terminal" id="terminal" cols={30}></textarea>
                </form>
            </div>
        </div>
    )
}

// React.FormEvent<HTMLInputElement>
const onSubmit = (event: any) => {
    event.preventDefault()
    console.log(event.target)
}