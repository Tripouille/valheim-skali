import { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from 'store';
import selectUsers from 'store/users/selectors';
import { actions } from 'store/users/slice';
import { User } from 'store/users/type';
import classes from './List.module.scss';

export interface ListProps {
  content: User[];
  onAddUser: (user: Omit<User, 'id'>) => void;
}

const List: React.FC<ListProps> = ({ content, onAddUser }) => {
  const [name, setName] = useState('');
  return (
    <div className={classes.listContent}>
      <label htmlFor="name">
        name
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <button type="submit" onClick={() => onAddUser({ name, age: 12 })}>
        ADD
      </button>
      <h1>User List</h1>
      {content.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  content: selectUsers(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAddUser: (user: User) => dispatch(actions.addRequest(user)),
});

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List);

export default ConnectedList;
