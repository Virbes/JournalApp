import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await addDoc(collection(db, uid, 'journal', 'notes'), newNote);
        dispatch(activeNote(docRef.id, newNote));
        dispatch(addNewNote(docRef.id, newNote));
    }
}

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: { id, ...note }
});

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});


export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}


export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }

        const { id, ...noteWithoutId } = note;
        await updateDoc(doc(db, uid, 'journal', 'notes', id), noteWithoutId);

        dispatch(refreshNote(id, noteWithoutId));

        Swal.fire({
            icon: 'success',
            title: 'Saved',
            text: note.title
        });
    };
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: { id, note: { id, ...note } }
});


export const startUploading = (file) => {
    return async (dispatch, getState) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });



        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote));
        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        await deleteDoc(doc(db, uid, 'journal', 'notes', id));

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});