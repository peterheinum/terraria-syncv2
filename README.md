# Terraria Sync v2 

## Prerequisits
1. Github account, added to your global user. (With password)
2. Access as collaborator to the repository
3. NodeJS
4. Npm/Yarn

## Getting started
1. Go to your "worlds" folder with a terminal. (The folder where your existing maps are)
2. do the following commands, in order.  
```
git clone https://github.com/peterheinum/terraria-syncv2.git
cd terraria-syncv2
npm ci/yarn install
``` 
3. Now you have the latest version. Now you are ready to start hosting. 

## Hosting
1. Inside the repository folder. Run 
```
node src/initialize
``` 
2. Host and play the server.
3. When you exit the server, please make sure that the last timestamp of save was the time you quit. 
4. (Not required if timestamp was correct). If timestamp was too long ago, you can manually sync by typing 
```
node src/push
```

## Donations
#### *please donate through swish at 0761347314*
