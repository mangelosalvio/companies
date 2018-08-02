import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    label,
    error,
    name,
    type,
    value,
    onChange,
    placeholder,
    disabled
}) => (
    <div className='field'>
        <label className="label">{label}</label>
            <div className="control">
                <input 
                    className={classnames('input', {
                        'is-danger' : error 
                    })} 
                    name={name}
                    type={type} 
                    value={value} 
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled} />
                { error && (
                    <p className={classnames('help',{
                        'is-danger' : error
                    })}>{error}</p>
                ) }
                
            </div>
    </div>
);

TextFieldGroup.propTypes = {
    label : PropTypes.string.isRequired,
    error : PropTypes.string,
    name : PropTypes.string.isRequired,
    type : PropTypes.string.isRequired,
    value : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    disabled : PropTypes.string,
    onChange : PropTypes.func.isRequired
}

TextFieldGroup.defaultProps = {
    text : 'text'
};

export default TextFieldGroup;