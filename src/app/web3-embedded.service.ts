import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3EmbeddedService {

  private bcNetwork: string = "http://15.114.245.91:8566";
  private web3I: Web3;
  private tokenContract: string;
  private tokenInterface: any;
  
  constructor() { 
	this.web3I = new Web3(new Web3.providers.HttpProvider(this.bcNetwork));
	this.tokenContract = "0xd55335DAfd6cCC3c8293E10d4F3Df9A16c154d47";
	this.tokenInterface = [{'constant':true,'inputs':[],'name':'name','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'spender','type':'address'},{'name':'value','type':'uint256'}],'name':'approve','outputs':[{'name':'','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'totalSupply','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'from','type':'address'},{'name':'to','type':'address'},{'name':'value','type':'uint256'}],'name':'transferFrom','outputs':[{'name':'','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'INITIAL_SUPPLY','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'decimals','outputs':[{'name':'','type':'uint8'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[],'name':'unpause','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'paused','outputs':[{'name':'','type':'bool'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'spender','type':'address'},{'name':'subtractedValue','type':'uint256'}],'name':'decreaseApproval','outputs':[{'name':'','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[{'name':'_owner','type':'address'}],'name':'balanceOf','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[],'name':'pause','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'symbol','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'to','type':'address'},{'name':'value','type':'uint256'}],'name':'transfer','outputs':[{'name':'','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':false,'inputs':[{'name':'spender','type':'address'},{'name':'addedValue','type':'uint256'}],'name':'increaseApproval','outputs':[{'name':'','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[{'name':'_owner','type':'address'},{'name':'_spender','type':'address'}],'name':'allowance','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'newOwner','type':'address'}],'name':'transferOwnership','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'inputs':[],'payable':false,'stateMutability':'nonpayable','type':'constructor'},{'anonymous':false,'inputs':[],'name':'Pause','type':'event'},{'anonymous':false,'inputs':[],'name':'Unpause','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'previousOwner','type':'address'},{'indexed':true,'name':'newOwner','type':'address'}],'name':'OwnershipTransferred','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'owner','type':'address'},{'indexed':true,'name':'spender','type':'address'},{'indexed':false,'name':'value','type':'uint256'}],'name':'Approval','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'from','type':'address'},{'indexed':true,'name':'to','type':'address'},{'indexed':false,'name':'value','type':'uint256'}],'name':'Transfer','type':'event'}]
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
	
	let contractI: any 		= new this.web3I.eth.Contract(this.tokenInterface, this.tokenContract);
	return contractI.methods.balanceOf(account).call();
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
  
  getRewardsSent(userAccount: string): Promise<any>
  {
	let contractI 		= new this.web3I.eth.Contract(this.tokenInterface, this.tokenContract);
	//console.log("contract is ", contractI.getPastEvents);
	return contractI.getPastEvents('Transfer',{'fromBlock':0,'filter':{'from': userAccount}})
		.then(events => {
			console.log("total number of recognitions sent", events.length);
			
			let trans:any [] = [];
			for(let event of events)
			{
				console.log("sent ", event.returnValues.value, "to ",  this.lookupUser(event.returnValues.to));
				
				trans.push({'sent': event.returnValues.value, 'to': this.lookupUser(event.returnValues.to)});
				
			}
			
			return trans;
		});
		
		
  }
  
  getRewardsReceived(userAccount: string): Promise<any>
	{
	let contractI: any 		= new this.web3I.eth.Contract(this.tokenInterface, this.tokenContract);
	
	//console.log("contract is ", contractI);
	return contractI.getPastEvents('Transfer',{'fromBlock':0,'filter':{'to': userAccount}})
		.then(events => {
			console.log("total number of recognitions received", events.length)
			
			let trans:any [] = [];
			for(let event of events)
			{
				console.log("received ", event.returnValues.value, "from ",  this.lookupUser(event.returnValues.to));
			
				trans.push({'received': event.returnValues.value, 'from': this.lookupUser(event.returnValues.to)});
				
			}
			return trans;
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
