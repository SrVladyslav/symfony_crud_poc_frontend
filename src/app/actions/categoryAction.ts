'use server'

// Delete category using delete API from Symfony
export const deleteCategory = async (categoryId:number|string, serverUrl?:string)=>{
    try{
        // TODO: Add validations
        
        const url = serverUrl || process.env.NEXT_PUBLIC_API_URL
        const res = await fetch(`${url}/api/categories/${categoryId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}` 
            }
        })

        if (!res.ok) {
            throw new Error('Failed to delete category');
        }

        return true

    }catch(e:any){
        return false
    }
}

// Update category using update API from Symfony
export const updateCategory = async (
    categoryId:number|string,
    categoryName:string,
    categoryDescription:string,
    serverUrl?:string
)=>{
    try{
        // TODO: Add validations

        const url = serverUrl || process.env.NEXT_PUBLIC_API_URL
        const res = await fetch(`${url}/api/categories/${categoryId}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}` 
            },
            body: JSON.stringify({
                name: categoryName,
                description: categoryDescription
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

// Create category using create API from Symfony
export const createCategory = async (
    categoryName:string,
    categoryDescription:string,
    serverUrl?:string
)=>{
    try{
        // TODO: Add validations

        const url = serverUrl || process.env.NEXT_PUBLIC_API_URL
        const res = await fetch(`${url}/api/categories/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_AUTH}` 
            },
            body: JSON.stringify({
                name: categoryName,
                description: categoryDescription
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