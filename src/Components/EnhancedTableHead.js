import { makeStyles, TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.background.paper,
  }
}))

const EnhancedTableHead = (props) => {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
		headCell,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const classesNew = useStyles();

  return (
    <TableHead >
      <TableRow >
				{headCell.map(headCell => (
					<TableCell
            className={classesNew.title}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          > {headCell.allowSort ? <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
						:
						<TableSortLabel
            >
              {headCell.label}
            </TableSortLabel>
						}            
          </TableCell>		
				))}
			</TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
