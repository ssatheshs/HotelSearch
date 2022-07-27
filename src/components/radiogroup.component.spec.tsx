import { h } from 'preact';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import RadioGroup from './radiogroup.component';
import { RATINGS } from "../consts/hotel"

configure({ adapter: new Adapter })


const setUp = (checkedBoxes, groupName, flds, changeHandler, filterName) =>{
    const component = shallow(<RadioGroup 
        checkedBoxes = {checkedBoxes} 
        groupName= {groupName} 
        fields={flds} 
        changeHandler={changeHandler} 
        filterName= {filterName} 
    />)

    return component

}
describe('Radio group Component', () => {

    let grpName = "Guest Rating"
    let fltrName = "ratings"
    let checkedBoxes =[]
    let changeHandler = jest.fn()

    it('List ratings', async () => {
        const ratingComponents = await setUp(checkedBoxes, grpName, RATINGS, changeHandler, fltrName)
        expect(ratingComponents.find('#rating-3').length).toBe(1)
    })

    it('selecting rating radio', async () => {
        const checkedBoxes = ["rating-5"]
        const ratingComponents = await setUp(checkedBoxes, grpName, RATINGS, changeHandler, fltrName)
        expect(ratingComponents.find('#rating-5').props().checked).toEqual(true)
        const onClick = ratingComponents.find('#rating-5').props().onChange()
        ratingComponents.update();
        expect(changeHandler).toHaveBeenCalled()
    })

    it('reset filters', async () => {
        const checkedBoxes = []
        const ratingComponents = await setUp(checkedBoxes, grpName, RATINGS, changeHandler, fltrName)
        expect(ratingComponents.find('#rating-3').props().checked).toEqual(false)
    })

    it('rating radio not rendered', async () => {
        const ratingComponents = await setUp([], grpName, [], changeHandler, fltrName)
        expect(ratingComponents.find('#rating-3').length).toBe(0)
    })

})