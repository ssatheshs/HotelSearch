import { h } from 'preact';
import { mount,configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import CheckboxGroup from './checkboxgroup.component';
import { AMENITIES, PRICES, RATINGS } from "../consts/hotel"

configure({ adapter: new Adapter })


const setUp = (checkedBoxes,groupName,flds,changeHandler,filterName) =>{
    const component = shallow(<CheckboxGroup 
        checkedBoxes = {checkedBoxes} 
        groupName= {groupName} 
        fields={flds} 
        changeHandler={changeHandler} 
        filterName= {filterName} 
    />)

    return component

}
describe('Checkbox group Component', () => {

    let grpName = "Price per head"
    let fltrName = "price"
    let checkedBoxes =[]
    let changeHandler = jest.fn()

    it('Listing checkboxes', async () => {
        const checkBoxes = await setUp(checkedBoxes, grpName,PRICES,changeHandler,fltrName)
        expect(checkBoxes.find('#over11000').length).toBe(1)
    })

    it('selecting checkbox', async () => {
        const checkedBoxes = ["over11000"]
        const checkBoxGroup = await setUp(checkedBoxes, grpName,PRICES,changeHandler,fltrName)
        expect(checkBoxGroup.find('#over11000').props().checked).toEqual(true)
        const onClick = checkBoxGroup.find('#over11000').props().onChange()
        checkBoxGroup.update();
        expect(changeHandler).toHaveBeenCalled()
    })

    it('reset filters', async () => {
        const checkedBoxes = []
        const checkBoxGroup = await setUp(checkedBoxes, grpName,PRICES,changeHandler,fltrName)
        expect(checkBoxGroup.find('#over11000').props().checked).toEqual(false)
    })

    it('checkboxes not rendered', async () => {
        const checkBoxGroup = await setUp([], grpName,[],changeHandler,fltrName)
        expect(checkBoxGroup.find('#over11000').length).toBe(0)
    })

})