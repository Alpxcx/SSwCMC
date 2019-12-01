function sudoku(size){
	this.size = size;
	this.ncnt = size * size;
	this.gsiz = this.ncnt * this.ncnt;
	this.arr = new Array(this.gsiz).fill(0);
	this.oarr = new Array(this.gsiz).fill(false);
	this.rowinfo = new Array(this.ncnt).fill(0);
	this.colinfo = new Array(this.ncnt).fill(0);
	this.boxinfo = new Array(this.ncnt).fill(0);
	this.ptor = new Array(this.gsiz);
	this.ptoc = new Array(this.gsiz);
	this.ptob = new Array(this.gsiz);
	this.fc = 0;
	this.ful = 0;
	for(var i=0,b,p;i < this.ncnt;i++){
		this.ful |= 1 << i;
		for(var j=0;j < this.ncnt;j++){
			p=j*this.ncnt+i;
			if(j%this.size===0) b=j+Math.floor(i/this.size);
			this.ptor[p] = j;
			this.ptoc[p] = i;
			this.ptob[p] = b;
		}
	}
	this.ful = this.ful << 1;
	this.init = function(arr){
		if(arr.length != this.gsiz) return;
		for(var i=0;i < this.gsiz;i++){
			if(arr[i]===0) continue;
			if(arr[i] > this.ncnt) continue;
			var r = this.ptor[i];
			var c = this.ptoc[i];
			var b = this.ptob[i];
			this.oarr[i]=true;
			this.fill(arr[i],r,c,b);
			this.fc++;
		}
		this.arr = arr.concat();
	}
	this.fill = function(num,r,c,b){
		var tbit = 1 << num;
		this.rowinfo[r] |= tbit;
		this.colinfo[c] |= tbit;
		this.boxinfo[b] |= tbit;
		this.fc++;
	}
	this.unfill = function(num,r,c,b){
		var tbit = 1 << num;
		this.rowinfo[r] &= ~tbit;
		this.colinfo[c] &= ~tbit;
		this.boxinfo[b] &= ~tbit;
		this.fc--;
	}
	this.solve = function(){
		mainfor:
		for(var i=0,iter=1,tbit,r,c,b;i < this.gsiz;){
			if(i===-1) return false;
			if(this.oarr[i]){i += iter;continue;}
			if(this.fc===this.gsiz) return true;
			var r = this.ptor[i];
			var c = this.ptoc[i];
			var b = this.ptob[i];
			tbit = this.rowinfo[r]|this.colinfo[c]|this.boxinfo[b];
			if(tbit===this.ful){
				this.unfill(this.arr[i],r,c,b);
				this.arr[i] = 0;
  			iter=-1;
  			i--;
				continue;
			}
			for(var j=this.arr[i]+1,cbit=1 << j;j <= this.ncnt;j++,cbit=cbit << 1){
				if(tbit&cbit) continue;
				this.unfill(this.arr[i],r,c,b);
				this.fill(j,r,c,b);
				this.arr[i] = j;
				iter=1;
				i++;
				continue mainfor;
			}
			this.unfill(this.arr[i],r,c,b);
			this.arr[i] = 0;
			iter=-1;
			i--;
		}
	}
}

//var ptor = [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8];
//var ptoc = [0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8];
//var ptob = [0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,3,3,3,4,4,4,5,5,5,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,6,6,6,7,7,7,8,8,8,6,6,6,7,7,7,8,8,8];