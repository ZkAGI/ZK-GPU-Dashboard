import { Field, Form } from 'houseform';

export function ThirdForm({ onNext }: { onNext: () => any }) {
    return <Form onSubmit={onNext}>
        {({ submit, isValid }) => <form onSubmit={(e) => {
            e.preventDefault()
            isValid && submit()
        }}>
            <h1>third  form</h1>
            <Field name='firstName'>
                {({ value, setValue }) => <div>
                    <input
                        type='text'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </div>}
            </Field>

            <button>Submit</button>
        </form>}
    </Form>
}