module.exports = {
  apps: [{
    script: 'npm start'
  }],

  deploy: {
    staging: {
      key: 'Keys/Staging.pem',
      user: 'ubuntu',
      host: 'ec2-65-2-161-186.ap-south-1.compute.amazonaws.com',
      ref: 'origin/api-integration',
      repo: 'https://github.com/moizmb/skappd_fe.git',
      path: '/home/ubuntu/apps/skappd',
      'pre-deploy-local': '',
      'post-deploy': 'source ~/.nvm/nvm.sh && yarn && yarn build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
