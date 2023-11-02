import React, { useEffect, useRef } from 'react';
import { NotesAppBar } from './NotesAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { id, body, title, date, url } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {

        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }

    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(id, { ...formValues }));
    }, [formValues, dispatch]);

    const hanldeDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className='notes__content'>

                <input type='text' placeholder='Some awesome a title' name='title' className='notes__title-input' value={title} onChange={handleInputChange} />
                <textarea placeholder='What happend today' name='body' className='notes__textarea' onChange={handleInputChange} value={body}></textarea>

                {
                    url &&
                    <div className="notes__image">
                        <img src={url} alt="image" className='img-fluid' />
                    </div>
                }

            </div>

                <button className='btn btn-danger' onClick={hanldeDelete}>Delete</button>

        </div>
    );
}
