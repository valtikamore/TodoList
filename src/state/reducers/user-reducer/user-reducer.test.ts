import { userReducer} from "./user-reducer";


describe('user Reducer test',()=>{
    type initialState = {
        name:string
        age:number
        children:{age:number,name:string}
    }
    test('increment male age',()=>{
        const startValue = {
            name:'Valentine',
            age:24,
            children:{
                age:2,
                name:'Maximus'
            }
        }
        const endValue = userReducer(startValue,{type:'INCREMENT-AGE'})
        expect(endValue.age).toEqual(25)
        expect(endValue.children.age).toEqual(2)
    })
    test('increment children age',()=>{
        const startValue = {
            name:'Valentine',
            age:24,
            children:{
                age:2,
                name:'Maximus'
            }
        }
        const endValue = userReducer(startValue,{type:'INCREMENT-CHILDREN-AGE'})
        expect(endValue.age).toEqual(24)
        expect(endValue.children.age).toEqual(3)
    })
    test('change name',()=>{
        const startValue:initialState = {
            name:'Valentine',
            age:24,
            children:{
                age:2,
                name:'Maximus'
            }
        }
        const newName = 'Natalia'

        const endValue = userReducer(startValue,{type:'CHANGE-NAME',newName})

        expect(endValue.name).toEqual(newName)
        expect(endValue.children.age).toEqual(2)
    })
    test('change user',()=>{
        const startValue:initialState = {
            name:'Valentine',
            age:24,
            children:{
                age:2,
                name:'Maximus'
            }
        }
        const newName = 'Natalia'
        const newAge = 22
        const endValue = userReducer(startValue,{type:'CHANGE-USER',newName,age:newAge})

        expect(endValue.name).toEqual(newName)
        expect(endValue.age).toEqual(newAge)
        expect(endValue.children.age).toEqual(2)
    })

})
