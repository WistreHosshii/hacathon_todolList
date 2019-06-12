import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

import styled from 'styled-components';
// import PageButton from './Button';
// import { Pages } from '../App';

const CustomizedText = styled.div`
  font-size: 4rem;
  color: red;
  text-align: center;
`;
const Body = styled.div`
  width: 100%;
  font-size: 1rem;
`;
const JobTable = styled.table`
  text-align: left;
  margin: 0 auto;
  width: 100%;
  border: solid 1px black;
`;
const Form = styled.div`
  padding-top: 15px;
`;
const TableWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
`;
interface Props {
  deleteTaskHandler: (id: string) => void;
  todos: Todo[];
  //changePage: (page: Pages) => void;
}
// interface State {
//   todos: Todo[];
//   value: string;
// }

export default class Timer extends Component<Props /*, State*/> {
  constructor(props: any) {
    super(props);
    // this.state = {
    //   todos: [],
    //   value: '',
    // };
  }

  render() {
    return (
      <Body>
        <CustomizedText>TODO LIST</CustomizedText>
        {/* <Link to="addTask">
          <PageButton changePage={this.props.changePage} page="AddTask"/>
        </Link> */}
        <TableWrapper>
          <JobTable>
            <tbody>
              <tr>
                <th>content</th>
                <th>Created At</th>
                <th>削除</th>
              </tr>
              {this.props.todos.map((todo, i) => {
                return (
                  <tr key={i}>
                    <td>{todo.content}</td>
                    <td>{new Date(todo.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => {
                          this.props.deleteTaskHandler(todo.id);
                        }}
                      >
                        削除!
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </JobTable>
          <Form />
        </TableWrapper>
      </Body>
    );
  }
}
