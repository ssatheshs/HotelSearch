import { h } from 'preact';
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import Loader from './loader.component';


configure({ adapter: new Adapter })

describe('Loader Component', () => {
    it('showing mask', async () => {
        const loader_component = shallow(<Loader loading={ true } />)
        expect(loader_component.find('#maskId').length).toBe(1)
    })
    it('hiding mask', async () => {
        const loader_component = shallow(<Loader loading={ false } />)
        expect(loader_component.find('#maskId').length).toBe(0)
    })
})