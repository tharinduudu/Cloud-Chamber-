// Four-module water-cooled concept assembly. mm. Not fabrication-ready.
// Body dimensions from sources.json; fittings and mounting are approximate.
exploded=0; $fn=40; sep=exploded*28;
module block(w,h,d,x,y,z){translate([x-w/2,y-h/2,z-d/2])cube([w,h,d]);}
color("gray")for(z=[-38,38])block(120,12,40,0,174,z);
color("white")for(x=[-38,38])for(z=[-38,38])block(40,6.4,40,x,183.2+sep,z);
color("peru")block(150,6,150,0,189.4+2*sep,0);
color("black")block(150,.1,150,0,192.45+2*sep,0);
color("white"){
 for(x=[-67.5,67.5])block(5,.5,140,x,192.75+3*sep,0);
 for(z=[-67.5,67.5])block(130,.5,5,0,192.75+3*sep,z);
}
color("lightblue",.18){
 for(x=[-68.5,68.5])block(3,87,134,x,236.5+4*sep,0);
 for(z=[-68.5,68.5])block(140,87,3,0,236.5+4*sep,z);
 block(140,3,140,0,281.5+4*sep,0);
}
color("beige"){
 for(x=[-65.5,65.5])block(3,15,134,x,269.5+4*sep,0);
 for(z=[-65.5,65.5])block(128,15,3,0,269.5+4*sep,z);
}
color("lightblue",.1){
 for(x=[-98,98]){block(4,90,192,x,245,0);for(z=[-89,89])block(4,166,14,x,117,z);}
 for(z=[-98,98]){block(200,90,4,0,245,z);for(x=[-92,92])block(16,166,4,x,117,z);}
}
color("black")block(192,4,192,0,30,0);
// External AS240, and two P12 fans (simple dimensional envelopes).
color("dimgray")block(120,269,36,205,164.5,0);
color("black")for(y=[104,224])difference(){block(120,120,25,205,y,30.5);translate([205,y,15])cylinder(r=54,h=35);}
color("lightblue",.3)block(66,62,56,-135,88,0);
color("black")block(66,24,56,-135,45,0);
// Hose paths, clamps, block supports and electrical equipment are not CAD releases.
