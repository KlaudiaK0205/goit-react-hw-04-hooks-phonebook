import PropTypes from 'prop-types';

export const PhonebookItem = ({ name, number,toDelete,id }) => {
    return (
        <li>
            <p> {name}: {number}</p>
            <button onClick={() =>toDelete(id) }>Delete</button>
        </li>
    )
}

PhonebookItem.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
}