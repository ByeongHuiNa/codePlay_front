// material-ui
import { 
  Typography,
  Button 
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const UserInformation = () => (
  <>
    <Typography variant="h2">프로필</Typography>
    <Button disableElevation color="primary">
      사용자 정보 변경
    </Button>
    <MainCard title="Sample Card">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended
        in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate
        descent molls anim id est labours.
      </Typography>
    </MainCard>
  </>
);

export default UserInformation;
