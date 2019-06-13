import React, { Component } from 'react';

import styled from 'styled-components';

const Body = styled.div`
  width: 100%;
  font-size: 1rem;
`;

const Form = styled.div`
  padding-top: 15px;
`;
const TableWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  padding: 3rem;
  height: 100px;
`;
const JobTable = styled.table`
  text-align: left;
  margin: 0 auto;
  width: 100%;
  border: solid 2px black;
  font-size: 18px;
  border-collapse: collapse;
`;
const TableTitle = styled.thead`
  display: block;
`;
const TableContents = styled.tbody`
  display: block;
  overflow-y: scroll;
  height: 70vh;
`;
const CustomTH = styled.th`
  font-size: 24px;
  padding: 10px;
  border-bottom: solid 1px black;
  width: 50%;
  min-width: 50px;
`;
const CustomTD = styled.td`
  padding: 10px;
  width: 50%;
  min-width: 50px;

  &:hover {
    background-color: lightblue;
  }
`;
const CustomTR = styled.tr`
  &:hover {
    background-color: lightcyan;
  }
`;

interface Props {
  deleteTaskHandler: (id: string) => void;
  todos: Todo[];
}

export default class Timer extends Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Body>
        <TableWrapper>
          <JobTable>
            <TableTitle>
              <tr>
                <CustomTH>content</CustomTH>
                <CustomTH>Created At</CustomTH>
                <CustomTH>削除</CustomTH>
              </tr>
            </TableTitle>
            <TableContents>
              {this.props.todos.map((todo, i) => {
                return (
                  <CustomTR key={i}>
                    <CustomTD>{todo.content}</CustomTD>
                    <CustomTD>{new Date(todo.createdAt).toLocaleString()}</CustomTD>
                    <CustomTD>
                      <button
                        onClick={() => {
                          this.props.deleteTaskHandler(todo.id);
                        }}
                      >
                        削除!
                      </button>
                    </CustomTD>
                  </CustomTR>
                );
              })}
            </TableContents>
          </JobTable>
          <Form />
        </TableWrapper>
      </Body>
    );
  }
}
