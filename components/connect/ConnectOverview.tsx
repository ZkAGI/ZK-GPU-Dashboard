"use client";

import { Field, Form } from 'houseform';
import { SecondForm } from './SecondForm';
import { ThirdForm } from './ThirdForm';
import { Radio } from './Radio'
import { useState } from 'react';

const forms = {
    darwin: [
        (onNext: () => any) => <SecondForm title='macOS' onNext={onNext} />,
        (onNext: () => any) => <SecondForm title='Catalina' onNext={onNext} />,
        (onNext: () => any) => <ThirdForm onNext={onNext} />
    ],
    win32: [
        (onNext: () => any) => <SecondForm title='Windows' onNext={onNext} />,
        (onNext: () => any) => <ThirdForm onNext={onNext} />
    ],
    linux: [
        (onNext: () => any) => <SecondForm title='Ubuntu' onNext={onNext} />,
        (onNext: () => any) => <SecondForm title='Bionic Beaver' onNext={onNext} />,
        (onNext: () => any) => <ThirdForm onNext={onNext} />
    ]
}

function RenderSequentially({ forms }: { forms: ((onNext: () => any) => JSX.Element)[] }) {
    const [index, setIndex] = useState(0)

    const onNext = () => setIndex(existing => existing + 1)

    return forms[index](onNext)
}

export function ConnectOverview() {
    const [formComponents, setFormComponents] = useState<((onNext: () => any) => JSX.Element)[]>([])

    const handleSubmit = ({ os }: { os: 'darwin' | 'win32' | 'linux' }) => {
        setFormComponents(forms[os])
    }

    return <>
        {formComponents.length == 0 && <Form onSubmit={handleSubmit}>
            {({ submit, isValid, value: formValue }) => <form onSubmit={(e) => {
                e.preventDefault()
                isValid && submit()
            }}>
                {formValue.os && <h1>Number of steps: {JSON.stringify(forms[formValue.os].length)}</h1>}
                <Field name='os'>
                    {({ value, setValue }) => <div>
                        <Radio
                            name="os"
                            value="darwin"
                            text="macOS"
                            onChange={setValue}
                            checked={value == 'darwin'}
                        />
                        <Radio
                            name="os"
                            value="win32"
                            text="Windows"
                            onChange={setValue}
                            checked={value == 'win32'}
                        />
                        <Radio
                            name="os"
                            value="linux"
                            text="Ubuntu"
                            onChange={setValue}
                            checked={value == 'linux'}
                        />
                    </div>}
                </Field>

                <button>Next</button>
            </form>}
        </Form>}

        {formComponents.length != 0 && <RenderSequentially forms={formComponents} />}
    </>
}