import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = 'https://parseapi.back4app.com/classes/List';

export const getAllContacts = createAsyncThunk('contacts/getAllContacts', async () => {
    try {
        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
                'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk'
            }
        });

        if (response.status !== 200) {
            return { code: `${response.status}`, message: `${response.statusText}` }
        }
        const data = await response.json();
        return data.results;

    } catch (error) {
        console.log(error)
        return error.message;
    }
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
                'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact)
        });

        if (response.status !== 201) {
            return { code: `${response.status}`, message: `${response.statusText}` }
        }
        const person = await response.json();

        const result = await fetch(`${baseUrl}/${person.objectId}`, {
            method: 'GET',
            headers: {
                'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
                'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk'
            }
        });

        if (result.status !== 200) {
            return { code: `${result.status}`, message: `${result.statusText}` }
        }
        return await result.json();

    } catch (error) {
        return error.message;
    }
});

export const updateContact = createAsyncThunk('contacts/updateContact', async (data) => {
    await fetch(`${baseUrl}/${data.id}`, {
        method: 'PUT',
        headers: {
            'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
            'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.body)
    });

    const res = await fetch(`${baseUrl}/${data.id}`, {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
            'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk'
        }
    });
    return res.json();

});

export const removeContact = createAsyncThunk('contacts/removeContact', async (objectId) => {
    await fetch(`${baseUrl}/${objectId}`, {
        method: 'DELETE',
        headers: {
            'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
            'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk'
        }
    });

    return { objectId };
});

