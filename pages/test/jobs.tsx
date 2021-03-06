import React, { memo, useEffect, useState } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';

import { useDispatch, useSelector } from '../../store/store';
import { fetchJobs, getJobsState, showRecentJobs } from '../../store/jobSlice';
import styles from '../../styles/Home.module.css';
import MUISelect from '../../components/select';

/**
 * A simple User card that pulls user info from redux-toolkit and displays it.
 * @constructor
 */
function UserCard() {
  const dispatch = useDispatch();
  const jobs = useSelector(getJobsState);
  const [recentJobSwitch, setRecentJobSwitch] = useState<boolean>(false);

  useEffect(()=>{
    //to fetch jobs on render
    dispatch(fetchJobs());
  },[]);

  /**
   * this function is written to handle recent post (posts that are posted more than 7 days ago)
   * @param val boolean
   */
  const recentJobHandle = (val: boolean) => {
    setRecentJobSwitch(val);
    dispatch(showRecentJobs(val))
  }
  return (
    <div className={styles.parent}>
      <div className={styles.description}>
        <MUISelect />
        <Button 
          variant={recentJobSwitch?"contained":"outlined"} 
          style={{width:'40%',height:'41%'}} 
          onClick={()=>recentJobHandle(!recentJobSwitch)}>
            Show Recent Jobs
        </Button>
      </div>
      <Container maxWidth='lg' fixed className={styles.dataContainer}>
        {jobs && jobs.map((job:{companyName: string; jobTitle: string; jobDescription: string;}, index: number) => {
          if(index<10){
            return(
              <Paper elevation={2} className={styles.paper}>
                  <h3 className={styles.jobTitle}>
                    <i>{job.jobTitle}</i>
                  </h3>
                  <h3  className={styles.company}>
                    <b>Company: </b> 
                    <i>{job.companyName}</i>
                  </h3>
                  <Paper variant="outlined" className={styles.desc}>
                    <h3><b>Description:</b></h3>
                    <div dangerouslySetInnerHTML={{__html: job.jobDescription}}></div>
                  </Paper>
              </Paper>
            )}
        })

        }
      </Container>
      </div>
  );
}

export default memo(UserCard);