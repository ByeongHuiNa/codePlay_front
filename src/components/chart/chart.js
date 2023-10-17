import { memo } from 'react';
import ApexChart from 'react-apexcharts';

import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const bgBlur = (props) => {
  const color = props?.color || '#000000';
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity)
      }
    };
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity)
  };
};

const Chart = styled(ApexChart)(({ theme }) => ({
  '& .apexcharts-canvas': {
    // Tooltip
    '& .apexcharts-tooltip': {
      ...bgBlur({
        color: theme.palette.background.default
      }),
      color: theme.palette.text.primary,
      boxShadow: theme.customShadows.dropdown,
      borderRadius: theme.shape.borderRadius * 1.25,
      '&.apexcharts-theme-light': {
        borderColor: 'transparent',
        ...bgBlur({
          color: theme.palette.background.default
        })
      }
    },
    '& .apexcharts-xaxistooltip': {
      ...bgBlur({
        color: theme.palette.background.default
      }),
      borderColor: 'transparent',
      color: theme.palette.text.primary,
      boxShadow: theme.customShadows.dropdown,
      borderRadius: theme.shape.borderRadius * 1.25,
      '&:before': {
        borderBottomColor: alpha(theme.palette.grey[500], 0.24)
      },
      '&:after': {
        borderBottomColor: alpha(theme.palette.background.default, 0.8)
      }
    },
    '& .apexcharts-tooltip-title': {
      textAlign: 'center',
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: alpha(theme.palette.grey[500], 0.08),
      color: theme.palette.text[theme.palette.mode === 'light' ? 'secondary' : 'primary']
    },

    // LEGEND
    '& .apexcharts-legend': {
      padding: 0
    },
    '& .apexcharts-legend-series': {
      display: 'inline-flex !important',
      alignItems: 'center'
    },
    '& .apexcharts-legend-marker': {
      marginRight: 8
    },
    '& .apexcharts-legend-text': {
      lineHeight: '26px',
      textTransform: 'capitalize'
    }
  }
}));

export default memo(Chart);
