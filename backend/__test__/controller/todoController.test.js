import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import * as todoController from '../../controller/todoController.js'; // import as namespace
import { fn, spyOn } from 'jest-mock';
const mockFn = fn();
import Todo from '../../models/todoModel.js';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../../models/todoModel.js', () => ({
  default: {
    find: jest.fn()
  }
}));

// jest.mock('../../models/todoModel.js');

const mockSave = jest.fn();
const mockFind = jest.fn();


Todo.find = mockFind;




describe('Todo Controller API', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {}
        };
        res = {
            status: jest.fn(()=>res),
            json: jest.fn(()=>res),
        };

        // Mock the Todo model methods
        Todo.prototype.save = mockSave;
        Todo.findByIdAndUpdate = jest.fn();
        Todo.findByIdAndDelete = jest.fn();
    });

    describe("for get todos function", ()=>{
        it("should return all todos", async ()=>{
            const mockTodo = [{ _id:0 , text:"todo1", completed:false},{ _id:1 , text:"todo2", completed:false}]
            mockFind.mockResolvedValue(mockTodo);
            await todoController.getTodos(req, res);

            expect(mockFind).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTodo);


        }); 
    })
});
