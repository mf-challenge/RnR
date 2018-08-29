import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3EmbeddedService {

  private bcNetwork: string = "http://15.114.245.91:8566";
  private web3I: Web3;
  private tokenContract: string;
  private tokenInterface: string;
  
  constructor() { 
	this.web3I = new Web3(new Web3.providers.HttpProvider(this.bcNetwork));
  }
  
  loadAccount(username: string, password: string, create: number) : string
  {
	let wlt: any = this.web3I.eth.accounts.wallet.load(password, username);
	
	if(wlt.length == 0 && create == 1)
	{
		wlt.create(1);
		console.log("new account created ", wlt[0].address);
		wlt.save(password, username);
	}
	else
	{
		let acc: any = wlt[0].address;
		console.log("account loaded ", acc);
	}
	
	let address: any = wlt[0].address;
	wlt.clear();
	return address;
   }
  
  getBalance(username: string, password: string): Promise<any>
  {
	let account: string = this.loadAccount(username,password, 1);
	return this.web3I.eth.getBalance(account);
  }
  
  reward(username: string, password: string, rewardee: string, reward: number)
  {
	this.getBalance(username,password)
	.then(balance => {
			if(balance >=  reward)
			{
					let fromAccount: any	= this.loadAccount(username,password, 0);
					let targetAccount: any 	= this.lookupAccount(rewardee);
					
					this.web3I.eth.getTransactionCount(fromAccount)
					.then( count => {
						console.log("transaction count	", count);
						let contractI: any 		= new this.web3I.eth.Contract(JSON.parse(this.tokenInterface), this.tokenContract);
						contractI.methods.transfer(targetAccount, reward).send({'from': fromAccount, 'nonce': count, 'gas': 3000000})
									.on('receipt', function(receipt) { console.log('reward transaction receipt', receipt);	})
									.on('error', function(err) {	console.log('reward transaction error', err); } );
					});
					
			}
			});
  }
  
  getAllRewards(username: string, password: string)
	{
	let userAccount: any	= this.loadAccount(username,password, 0);
	let contractI 		= new this.web3I.eth.Contract(JSON.parse(this.tokenInterface), this.tokenContract);
	
	contractI.getPastEvents('Transfer',{'filter':{'from': userAccount}})
		.then(events => {
			console.log("total number of recognitions sent", events.length);
			
			for(let event of events)
			{
				console.log("sent ", event.returnValues.value, "to ",  this.lookupUser(event.returnValues.to));
				/*this.web3I.eth.getBlock(events[i].blockNumber).then( blk => {
					console.log("date ", this.convertTime(blk.timestamp), "sent ", events[i].returnValues.value, "to ",  this.lookupUser(events[i].returnValues.to));
				})*/		
				
			}
		})
	contractI.getPastEvents('Transfer',{'filter':{'to': userAccount}})
		.then(events => {
			console.log("total number of recognitions received", events.length)
			for(let event of events)
			{
				console.log("received ", event.returnValues.value, "from ",  this.lookupUser(event.returnValues.to));
				/*this.web3I.eth.getBlock(events[i].blockNumber).then( blk => {
					console.log("date ", this.convertTime(blk.timestamp), "received ", events[i].returnValues.value, "from ",  this.lookupUser(events[i].returnValues.to));
				})*/	
				
			}
		})
	
	}
	
	convertTime(timestamp: any): any
	{
		return timestamp;
	}
	
  lookupAccount(rewardee: string): string
  {
	return rewardee;
  }
  lookupUser(rewardee: string): string
  {
	return rewardee;
  }
  
  sendEth(username: string, password: string): Promise<any>
	{
		let wlt: any	=	this.web3I.eth.accounts.wallet.load(password,username);
		let pk: any	=	wlt[0].privateKey;
		let fromAccount: any	= wlt[0].address;
		let targetAccount: string = '0x0c0df324c081faf1c9fe6bf98379e0614181d254';
		return this.web3I.eth.getTransactionCount(fromAccount)
			.then( count => {
				console.log("transaction count	", count);
				let tx: any	= 	{'from': fromAccount, 'to': '0x0c0df324c081faf1c9fe6bf98379e0614181d254', 'value': this.web3I.utils.toWei('1', 'ether'), 'nonce': count, 'gas': 3000000,'gasPrice': 20000000000};
				console.log("tx is ", tx);
				console.log("pk is ", pk);
				return wlt[0].signTransaction(tx)
					.then( signed => {
						this.web3I.eth.accounts.wallet.clear();
						let rt:any  = signed.rawTransaction;
						return this.web3I.eth.sendSignedTransaction(rt)
							.then((receipt) => {
								return receipt;
							});
					});
			});
	}
}
