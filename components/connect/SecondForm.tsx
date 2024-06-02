import { Field, Form } from 'houseform';

export function SecondForm({ title, onNext }: { title: string, onNext: () => any }) {
    return <Form onSubmit={onNext}>
        {({ submit, isValid }) => <form onSubmit={(e) => {
            e.preventDefault()
            isValid && submit()
        }}>
            <h1>{title}</h1>
            <Field name='firstName'>
                {({ value, setValue }) => <div>
                    <input
                        type='text'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </div>}
            </Field>
            <Field name='middleName'>
                {({ value, setValue }) => <div>
                    <input
                        type='text'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </div>}
            </Field>

            <button>Next</button>
        </form>}
    </Form>
}