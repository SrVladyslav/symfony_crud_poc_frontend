'use server'

// Create product using create API from Symfony
export const createProduct = async (
    productName:string,
    productDescription:string,
    categoryId:number|string,
    serverUrl?:string
)=>{
    try{
        // TODO: Add validations
        
        const url = serverUrl || process.env.NEXT_PUBLIC_API_URL
        const res = await fetch(`${url}/api/products/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}` 
            },
            body: JSON.stringify({
                name: productName,
                description: productDescription,
                categoryId: categoryId
            })
        })

        if (!res.ok) {
            return false
        }

        return true

    }catch(e:any){
        return false
    }
}