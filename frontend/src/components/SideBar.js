import React from 'react'

const SideBar = () => {
    return (
        <div id="sidebar-nav" className="sidebar">
			<div className="sidebar-scroll">
				<nav>
					<ul className="nav">
						<li><a href="#" className="active"><i className="lnr lnr-home"></i> <span>Tableau de bord</span></a></li>
						<li><a href="#" className=""><i className="lnr lnr-users"></i> <span>Agents</span></a></li>
						<li><a href="#" className=""><i className="lnr lnr-users"></i> <span>Membres</span></a></li>
						<li>
							<a href="#subPages" data-toggle="collapse" className="collapsed"><i className="lnr lnr-cog"></i> <span>Actions</span> <i className="icon-submenu lnr lnr-chevron-left"></i></a>
							<div id="subPages" className="collapse ">
								<ul className="nav">
									<li><a href="#" className="">Action 1</a></li>
									<li><a href="#" className="">Action 2</a></li>
									<li><a href="#" className="">Action 3</a></li>
								</ul>
							</div>
						</li>
						<li><a href="#" className=""><i className="lnr lnr-question-circle"></i> <span>Aide</span></a></li>
					</ul>
				</nav>
			</div>
		</div>
    )
}

export default SideBar