const App = () => {
    return (
        <div>
            <Person
                name='Bob'
                age={7}
                hobbies={['doing stuff', 'eating oats', 'galloping through fields']}
                isHuman={false}
            />
            <Person
                name='Mike'
                age={14}
                hobbies={['video games', 'annoying people', 'collecting potatoes']}
                isHuman={true}
            />
            <Person
                name='Margaret'
                age={20}
                hobbies={['flying kites', 'underwater basket weaving', 'above water basket weaving']}
                isHuman={true}
            />
        </div>
    )
}