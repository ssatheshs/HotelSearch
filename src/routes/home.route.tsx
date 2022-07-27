import { h, JSX } from 'preact'
import SearchComponent from '../components/search.component'

export default function HomeRoute(): JSX.Element {
    return (
        <section>
            <SearchComponent />
        </section>
    )
}