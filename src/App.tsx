import SpiceClient from '@/services/spice'
import { useEffect, useState } from 'react'


function App() {
    const client = new SpiceClient({
        token: import.meta.env.VITE_ZED_TOKEN,
        endpoint: import.meta.env.VITE_ZED_ENDPOINT
    })

    const [schema, setSchema] = useState<string>()
    const [schemaError, setSchemaError] = useState<string>()

    useEffect(() => {
        const fetchSchema = async () => {
            try {
                const result = await client.getSchema()
                setSchema(result)
                setSchemaError(undefined)
            } catch (e) {
                setSchemaError((e as any).details)
            }
        }

        void fetchSchema()
    }, [setSchema, setSchemaError])
    return (
        <div>
            <b>Schema:</b> { schema ?? (schemaError ?? 'Loading...') }
        </div>
    )
}

export default App