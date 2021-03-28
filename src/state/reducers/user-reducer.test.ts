import {userReducer} from "./user-reducer";



    describe('user reducer ', () => {
        const startState = {age:20,childrenCount:2,name:'Valentine'}


        test('Children age should grow up',()=> {
            const endState = userReducer(startState,{type:'INCREMENT-AGE'})
            expect(endState).toBeDefined()
            expect(endState).not.toBeUndefined()
            expect(endState.age).toEqual(21)
            expect(endState.childrenCount).toEqual(2)
        })
        test('user reducer should be increment only childrenCount',()=> {
            const endState = userReducer(startState,{type:'INCREMENT-CHILDREN-COUNT'})
            expect(endState).toBeDefined()
            expect(endState).not.toBeUndefined()
            expect(endState.childrenCount).toBe(3)
        })
        test('user reducer should change user name',()=> {
            const newName = 'Natali'
            const endState = userReducer(startState,{type:'CHANGE-NAME',newName:newName})

            expect(endState).toBeDefined()
            expect(endState).not.toBeUndefined()
            expect(endState.name).toBe('Natali')
        })
    })





