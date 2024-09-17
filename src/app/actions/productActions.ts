'use server'

// Create product using create API from Symfony
export const createProduct = async (
    productName:string,
    productDescription:string,
    categoryId:number|string,
    price:number,
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
                categoryId: categoryId,
                price: price
            })
        })

        if (!res.ok) {
            return false
        }

        return true

    }catch(e:unknown){
        return false
    }
}

// Create product using create API from Symfony
export const updateProduct = async (
    productId:number|string,
    productName:string,
    productDescription:string,
    price:number,
    selectedCategory:number,
    serverUrl?:string|null
)=>{
    try{
        // TODO: Add validations
        
        const url = serverUrl || process.env.NEXT_PUBLIC_API_URL
        const res = await fetch(`${url}/api/products/${productId}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}` 
            },
            body: JSON.stringify({
                name: productName,
                description: productDescription,
                price: price,
                categoryId: selectedCategory
            })
        })

        if (!res.ok) {
            return false
        }

        return true

    }catch(e:unknown){
        return false
    }
}

// Delete product using delete API from Symfony
export const deleteProduct = async (productId:number|string, serverUrl?:string)=>{
    try{
        // TODO: Add validations
        
        const url = serverUrl || process.env.NEXT_PUBLIC_API_URL
        const res = await fetch(`${url}/api/products/${productId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}` 
            }
        })

        if (!res.ok) {
            return false
            // throw new Error('Failed to delete product');
        }

        return true

    }catch(e:unknown){
        return false
    }
}