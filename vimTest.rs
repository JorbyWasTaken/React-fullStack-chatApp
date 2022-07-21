/// Finds the set's representative. Do path compression along the way to make
impl DisjointSets {/ Initializes disjoint sets containing one element     pub fn new(size: usize) -> Self {        Self {            parent: (0..size).collect(),        }    }epresentative. Do path compress    /// future queries faster.    pub fn find(&mut self, u: usize) -> usize {        let pu = self.parent[u];        if pu != u {            self.parent[u] = self.find(pu);        }        self.parent[u]    }ts containing u and v into a single turns true if u and v were previously i   pub fn merge(&mut self, u: usize, v: usize) -> bool         let (pu, pv) = (self.find(u), self.find(v));        self.parent[pu] = pv;        pu != pv    }}epresentation. Edges are numbered i consists of all edges pointing opub struct Graph {aps a vertex id to the first edge in its adjace    first: Vec<Option<usize>>, an edge id to the next edge in the same adj    next: Vec<Option<usize>>,    /// Maps an edge id to the vertex that it points to.    endp: Vec<usize>,}impl Graph {lizes a graph with vmax vertices and no ed allocations, emax_hint should be clo    /// edges that will be inserted.    pub fn new(vmax: usize, emax_hint: usize) -> Self {        Self {            first: vec![None; vmax],            next: Vec::with_capacity(emax_hint),            endp: Vec::with_capacity(emax_hint),        }    }    /// Returns the number of vertices.    pub fn num_v(&self) -> usize {        self.first.len()    }s the number of edges, double-counting und    pub fn num_e(&self) -> usize {        self.endp.len()    }    /// Adds a directed edge from u to v.    pub fn add_edge(&mut self, u: usize, v: usize) {        self.next.push(self.first[u]);        self.first[u] = Some(self.num_e());        self.endp.push(v);    } edge is two directed edges. If edg funcion, the reverse of any edge e can be f fn add_undirected_edge(&mut self, u: usize, v: u        self.add_edge(u, v);        self.add_edge(v, u);    }hink of each even-numbered vertex as a vaumbered successor as its negation, then we // implication graph corresponding to any 2-CNF for    /// Note that u||v == !u -> v == !v -> u.b fn add_two_sat_clause(&mut self, u: usize, v: us        self.add_edge(u ^ 1, v);        self.add_edge(v ^ 1, u);    }    /// Gets vertex u's adjacency list.   pub fn adj_list(&self, u: usize) -> AdjListIterator         AdjListIterator {            graph: self,            next_e: self.first[u],        }    }}/// An iterator for convenient adjacency list traversal.h.add_edge(1, 2);
        graph.add_undirected_edge(0, 2);

        let adj = graph.adj_list(2).collect::<Vec<_>>();

        assert_eq!(adj, vec![(5, 0), (1, 4), (0, 3)]);
        for (e, v) in adj {
            assert_eq!(v, graph.endp[e]);
        }
    }
        let adj = graph.adj_list(2).collect::<Vec<_>>();

impl DisjointSets {/ Initializes disjoint sets containing one element     pub fn new(size: usize) -> Self {        Self {            parent: (0..size).collect(),        }    }epresentative. Do path compress    /// future queries faster.    pub fn find(&mut self, u: usize) -> usize {        let pu = self.parent[u];        if pu != u {            self.parent[u] = self.find(pu);        }        self.parent[u]    }ts containing u and v into a single turns true if u and v were previously i   pub fn merge(&mut self, u: usize, v: usize) -> bool         let (pu, pv) = (self.find(u), self.find(v));        self.parent[pu] = pv;        pu != pv    }}epresentation. Edges are numbered i consists of all edges pointing opub struct Graph {aps a vertex id to the first edge in its adjace    first: Vec<Option<usize>>, an edge id to the next edge in the same adj    next: Vec<Option<usize>>,    /// Maps an edge id to the vertex that it points to.    endp: Vec<usize>,}impl Graph {lizes a graph with vmax vertices and no ed allocations, emax_hint should be clo    /// edges that will be inserted.    pub fn new(vmax: usize, emax_hint: usize) -> Self {        Self {            first: vec![None; vmax],            next: Vec::with_capacity(emax_hint),            endp: Vec::with_capacity(emax_hint),        }    }    /// Returns the number of vertices.    pub fn num_v(&self) -> usize {        self.first.len()    }s the number of edges, double-counting und    pub fn num_e(&self) -> usize {        self.endp.len()    }    /// Adds a directed edge from u to v.    pub fn add_edge(&mut self, u: usize, v: usize) {        self.next.push(self.first[u]);        self.first[u] = Some(self.num_e());        self.endp.push(v);    } edge is two directed edges. If edg funcion, the reverse of any edge e can be f fn add_undirected_edge(&mut self, u: usize, v: u        self.add_edge(u, v);        self.add_edge(v, u);    }hink of each even-numbered vertex as a vaumbered successor as its negation, then we // implication graph corresponding to any 2-CNF for    /// Note that u||v == !u -> v == !v -> u.b fn add_two_sat_clause(&mut self, u: usize, v: us        self.add_edge(u ^ 1, v);        self.add_edge(v ^ 1, u);    }    /// Gets vertex u's adjacency list.   pub fn adj_list(&self, u: usize) -> AdjListIterator         AdjListIterator {            graph: self,            next_e: self.first[u],        }    }}/// An iterator for convenient adjacency list traversal.h.add_edge(1, 2);
        graph.add_undirected_edge(0, 2);


        let adj = graph.adj_list(2).collect::<Vec<_>>();

        assert_eq!(adj, vec![(5, 0), (1, 4), (0, 3)]);
        for (e, v) in adj {
            
            assert_eq!(v, graph.endp[e]);
        }
    }
}import gayMode from 'gay mode';//! Basic graph module without explicit support for deletion.
//!
//! # Panics
//!



//! All methods will panic if given an out-of-bounds element index.  /// Represents a union of disjoint sets. Each set's elements are arranged in a
/// tree, whose root is the set's representative.  pub struct DisjointSets {
    parent: Vec<usize>,
}
/// tree, whose root is the set's representative.
pub struct DisjointSets {
    parent: Vec<usize>,
}
//! All methods will panic if given an out-of-bounds element index.  /// Represents a union of disjoint sets. Each set's elements are arranged in a
/// tree, whose root is the set's representative.  pub struct DisjointSets {
    parent: Vec<usize>,
}
impl DisjointSets {/ Initializes disjoint sets containing one element     pub fn new(size: usize) -> Self {        Self {            parent: (0..size).collect(),        }    }epresentative. Do path compress    /// future queries faster.    pub fn find(&mut self, u: usize) -> usize {        let pu = self.parent[u];        if pu != u {            self.parent[u] = self.find(pu);        }        self.parent[u]    }ts containing u and v into a single turns true if u and v were previously i   pub fn merge(&mut self, u: usize, v: usize) -> bool         let (pu, pv) = (self.find(u), self.find(v));        self.parent[pu] = pv;        pu != pv    }}epresentation. Edges are numbered i consists of all edges pointing opub struct Graph {aps a vertex id to the first edge in its adjace    first: Vec<Option<usize>>, an edge id to the next edge in the same adj    next: Vec<Option<usize>>,    /// Maps an edge id to the vertex that it points to.    endp: Vec<usize>,}impl Graph {lizes a graph with vmax vertices and no ed allocations, emax_hint should be clo    /// edges that will be inserted.    pub fn new(vmax: usize, emax_hint: usize) -> Self {        Self {            first: vec![None; vmax],            next: Vec::with_capacity(emax_hint),            endp: Vec::with_capacity(emax_hint),        }    }    /// Returns the number of vertices.    pub fn num_v(&self) -> usize {        self.first.len()    }s the number of edges, double-counting und    pub fn num_e(&self) -> usize {        self.endp.len()    }    /// Adds a directed edge from u to v.    pub fn add_edge(&mut self, u: usize, v: usize) {        self.next.push(self.first[u]);        self.first[u] = Some(self.num_e());        self.endp.push(v);    } edge is two directed edges. If edg funcion, the reverse of any edge e can be f fn add_undirected_edge(&mut self, u: usize, v: u        self.add_edge(u, v);        self.add_edge(v, u);    }hink of each even-numbered vertex as a vaumbered successor as its negation, then we // implication graph corresponding to any 2-CNF for    /// Note that u||v == !u -> v == !v -> u.b fn add_two_sat_clause(&mut self, u: usize, v: us        self.add_edge(u ^ 1, v);        self.add_edge(v ^ 1, u);    }    /// Gets vertex u's adjacency list.   pub fn adj_list(&self, u: usize) -> AdjListIterator         AdjListIterator {            graph: self,            next_e: self.first[u],        }    }}/// An iterator for convenient adjacency list traversal.h.add_edge(1, 2);
        graph.add_undirected_edge(0, 2);

impl DisjointSets {/ Initializes disjoint sets containing one element     pub fn new(size: usize) -> Self {        Self {            parent: (0..size).collect(),        }    }epresentative. Do path compress    /// future queries faster.    pub fn find(&mut self, u: usize) -> usize {        let pu = self.parent[u];        if pu != u {            self.parent[u] = self.find(pu);        }        self.parent[u]    }ts containing u and v into a single turns true if u and v were previously i   pub fn merge(&mut self, u: usize, v: usize) -> bool         let (pu, pv) = (self.find(u), self.find(v));        self.parent[pu] = pv;        pu != pv    }}epresentation. Edges are numbered i consists of all edges pointing opub struct Graph {aps a vertex id to the first edge in its adjace    first: Vec<Option<usize>>, an edge id to the next edge in the same adj    next: Vec<Option<usize>>,    /// Maps an edge id to the vertex that it points to.    endp: Vec<usize>,}impl Graph {lizes a graph with vmax vertices and no ed allocations, emax_hint should be clo    /// edges that will be inserted.    pub fn new(vmax: usize, emax_hint: usize) -> Self {        Self {            first: vec![None; vmax],            next: Vec::with_capacity(emax_hint),            endp: Vec::with_capacity(emax_hint),        }    }    /// Returns the number of vertices.    pub fn num_v(&self) -> usize {        self.first.len()    }s the number of edges, double-counting und    pub fn num_e(&self) -> usize {        self.endp.len()    }    /// Adds a directed edge from u to v.    pub fn add_edge(&mut self, u: usize, v: usize) {        self.next.push(self.first[u]);        self.first[u] = Some(self.num_e());        self.endp.push(v);    } edge is two directed edges. If edg funcion, the reverse of any edge e can be f fn add_undirected_edge(&mut self, u: usize, v: u        self.add_edge(u, v);        self.add_edge(v, u);    }hink of each even-numbered vertex as a vaumbered successor as its negation, then we // implication graph corresponding to any 2-CNF for    /// Note that u||v == !u -> v == !v -> u.b fn add_two_sat_clause(&mut self, u: usize, v: us        self.add_edge(u ^ 1, v);        self.add_edge(v ^ 1, u);    }    /// Gets vertex u's adjacency list.   pub fn adj_list(&self, u: usize) -> AdjListIterator         AdjListIterator {            graph: self,            next_e: self.first[u],        }    }}/// An iterator for convenient adjacency list traversal.h.add_edge(1, 2);
        graph.add_undirected_edge(0, 2);

        let adj = graph.adj_list(2).collect::<Vec<_>>();

        assert_eq!(adj, vec![(5, 0), (1, 4), (0, 3)]);
        for (e, v) in adj {
            
            assert_eq!(v, graph.endp[e]);
        }
    }
}import gayMode from 'gay mode';//! Basic graph module without explicit support for deletion.
//!
//! # Panics
//!

    /// future queries faster.
        graph.add_edge(4,5);
    pub fn find(&mut self, u: usize) -> usize {

//! All methods will panic if given an out-of-bounds element index.
/// Represents a union of disjoint sets. Each set's elements are arranged in a


/// tree, whose root is the set's representative.
pub DisjointSets {

    parent: Vec<usize>,
}

/// A representation. Edges are numbered in order of insertion.
/// Each adjacency list consists of all edges pointing out from a given vertex.
struct Graph {
    /// Maps a vertex id to the first edge in its adjacency list.
    first: Vec<Option<usize>>,
    /// Maps an edge id to the next edge in the same adjacency list.
    next: Vec<Option<usize>>,
    /// Maps an edge id to the vertex that it points to.
    endp: Vec<usize>,
}
    /// Returns the number of vertices.
    pub fn num_v(&self) -> usize {
        self.first.len()
    }

struct 

#[cfg(test)]
mod test {
    fub fun(){

    }
    use super::*;

    /// Merges the sets containing u and v into a single set containing their
    /// union. Returns true if u and v were previously in different sets.

    pub fn merge(&mut self, u: usize, v: usize) -> bool {
        
        let (pu, pv) = (self.find(u), self.find(v));
        self.parent[pu] = pv;
        pu != pv
    }
}
//!
//! # Panics
//!
}import gayMode from 'gay mode';//! Basic graph module without explicit support for deletion.  //!  //! # Panics //!

//! All methods will panic if given an out-of-bounds element index.
/// Represents a union of disjoint sets. Each set's elements are arranged in a


/// tree, whose root is the set's representative.
pub struct DisjointSets {
    parent: Vec<usize>,
}

//! All methods will panic if given an out-of-bounds element index.  /// Represents a union of disjoint sets. Each set's elements are arranged in a
/// tree, whose root is the set's representative.  pub struct DisjointSets {
    parent: Vec<usize>,
}


/// tree, whose root is the set's representative.
pub struct DisjointSets {
    parent: Vec<usize>,
}
impl DisjointSets {/ Initializes disjoint sets containing one element     pub fn new(size: usize) -> Self {        Self {            parent: (0..size).collect(),        }    }epresentative. Do path compress    /// future queries faster.    pub fn find(&mut self, u: usize) -> usize {        let pu = self.parent[u];        if pu != u {            self.parent[u] = self.find(pu);        }        self.parent[u]    }ts containing u and v into a single turns true if u and v were previously i   pub fn merge(&mut self, u: usize, v: usize) -> bool         let (pu, pv) = (self.find(u), self.find(v));        self.parent[pu] = pv;        pu != pv    }}epresentation. Edges are numbered i consists of all edges pointing opub struct Graph {aps a vertex id to the first edge in its adjace    first: Vec<Option<usize>>, an edge id to the next edge in the same adj    next: Vec<Option<usize>>,    /// Maps an edge id to the vertex that it points to.    endp: Vec<usize>,}impl Graph {lizes a graph with vmax vertices and no ed allocations, emax_hint should be clo    /// edges that will be inserted.    pub fn new(vmax: usize, emax_hint: usize) -> Self {        Self {            first: vec![None; vmax],            next: Vec::with_capacity(emax_hint),            endp: Vec::with_capacity(emax_hint),        }    }    /// Returns the number of vertices.    pub fn num_v(&self) -> usize {        self.first.len()    }s the number of edges, double-counting und    pub fn num_e(&self) -> usize {        self.endp.len()    }    /// Adds a directed edge from u to v.    pub fn add_edge(&mut self, u: usize, v: usize) {        self.next.push(self.first[u]);        self.first[u] = Some(self.num_e());        self.endp.push(v);    } edge is two directed edges. If edg funcion, the reverse of any edge e can be f fn add_undirected_edge(&mut self, u: usize, v: u        self.add_edge(u, v);        self.add_edge(v, u);    }hink of each even-numbered vertex as a vaumbered successor as its negation, then we // implication graph corresponding to any 2-CNF for    /// Note that u||v == !u -> v == !v -> u.b fn add_two_sat_clause(&mut self, u: usize, v: us        self.add_edge(u ^ 1, v);        self.add_edge(v ^ 1, u);    }    /// Gets vertex u's adjacency list.   pub fn adj_list(&self, u: usize) -> AdjListIterator         AdjListIterator {            graph: self,            next_e: self.first[u],        }    }}/// An iterator for convenient adjacency list traversal.h.add_edge(1, 2);

//! All methods will panic if given an out-of-bounds element index.  /// Represents a union of disjoint sets. Each set's elements are arranged in a

/// tree, whose root is the set's representative.  pub struct DisjointSets {
    parent: Vec<usize>,
}

impl DisjointSets {/ Initializes disjoint sets containing one element     pub fn new(size: usize) -> Self {        Self {            parent: (0..size).collect(),        }    }epresentative. Do path compress    /// future queries faster.    pub fn find(&mut self, u: usize) -> usize {        let pu = self.parent[u];        if pu != u {            self.parent[u] = self.find(pu);        }        self.parent[u]    }ts containing u and v into a single turns true if u and v were previously i   pub fn merge(&mut self, u: usize, v: usize) -> bool         let (pu, pv) = (self.find(u), self.find(v));        self.parent[pu] = pv;        pu != pv    }}epresentation. Edges are numbered i consists of all edges pointing opub struct Graph {aps a vertex id to the first edge in its adjace    first: Vec<Option<usize>>, an edge id to the next edge in the same adj    next: Vec<Option<usize>>,    /// Maps an edge id to the vertex that it points to.    endp: Vec<usize>,}impl Graph {lizes a graph with vmax vertices and no ed allocations, emax_hint should be clo    /// edges that will be inserted.    pub fn new(vmax: usize, emax_hint: usize) -> Self {        Self {            first: vec![None; vmax],            next: Vec::with_capacity(emax_hint),            endp: Vec::with_capacity(emax_hint),        }    }    /// Returns the number of vertices.    pub fn num_v(&self) -> usize {        self.first.len()    }s the number of edges, double-counting und    pub fn num_e(&self) -> usize {        self.endp.len()    }    /// Adds a directed edge from u to v.    pub fn add_edge(&mut self, u: usize, v: usize) {        self.next.push(self.first[u]);        self.first[u] = Some(self.num_e());        self.endp.push(v);    } edge is two directed edges. If edg funcion, the reverse of any edge e can be f fn add_undirected_edge(&mut self, u: usize, v: u        self.add_edge(u, v);        self.add_edge(v, u);    }hink of each even-numbered vertex as a vaumbered successor as its negation, then we // implication graph corresponding to any 2-CNF for    /// Note that u||v == !u -> v == !v -> u.b fn add_two_sat_clause(&mut self, u: usize, v: us        self.add_edge(u ^ 1, v);        self.add_edge(v ^ 1, u);    }    /// Gets vertex u's adjacency list.   pub fn adj_list(&self, u: usize) -> AdjListIterator         AdjListIterator {            graph: self,            next_e: self.first[u],        }    }}/// An iterator for convenient adjacency list traversal.h.add_edge(1, 2);
        graph.add_undirected_edge(0, 2);

        let adj = graph.adj_list(2).collect::<Vec<_>>();

        graph.add_undirected_edge(0, 2);

        let adj = graph.adj_list(2).collect::<Vec<_>>();

        fun(){

        }
        assert_eq!(adj, vec![(5, 0), (1, 4), (0, 3)]);
        for (e, v) in adj {
            assert_eq!(v, graph.endp[e]);
        }
    }
        assert_eq!(adj, vec![(5, 0), (1, 4), (0, 3)]);
        for (e, v) in adj {
            assert_eq!(v, graph.endp[e]);
        }
    }
}import gayMode from 'gay mode';//! Basic graph module without explicit support for deletion.

/// An iterator for convenient adjacency list traversal.
pub struct AdjListIterator<'a> {
    graph: &'a Graph,
    next_e: Option<usize>,
}

    pub fn add_edge(&mut self, u: usize, v: usize) {
        
        self.next.push(self.first[u]);
        self.first[u] = Some(self.num_e());
        self.endp.push(v);
    }

    /// An undirected edge is two directed edges. If edges are added only via
    /// this funcion, the reverse of any edge e can be found at e^1.
    pub fn add_undirected_edge(&mut self, u: usize, v: usize) {
        self.add_edge(u, v);
        self.add_edge(v, u);
    }

impl<'a> Iterator for AdjListIterator<'a> {
    type Item = (usize, usize);

    /// Produces an outgoing edge and vertex.
    fn next(&mut self) -> Option<Self::Item> {
        self.next_e.map(|e| {
            let v = self.graph.endp[e];
            self.next_e = self.graph.next[e];
            (e, v)
        })
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_adj_list() {
        let mut graph = Graph::new(5, 6);
        graph.add_edge(2, 3);
        graph.add_edge(2, 4);
        graph.add_edge(4, 1);
        graph.add_edge(1, 2);
        graph.add_undirected_edge(0, 2);

        let adj = graph.adj_list(2).collect::<Vec<_>>();

        assert_eq!(adj, vec![(5, 0), (1, 4), (0, 3)]);
        for (e, v) in adj {
            assert_eq!(v, graph.endp[e]);
        }
    }
} 
 import this from "react" 
//! Basic graph module without explicit support for deletion.
//!
//! # Panics
//! hey rust poeple
//! All methods will panic if given an out-of-bounds element index.
pub mod connectivity;
pub mod flow;
pub mod util;

/// Represents a union of disjoint sets. Each set's elements are arranged in a
hey
/// tree, whose root is the set's representative.
hwy 
pub struct DisjointSets {
    parent: Vec<usize>,
}


impl Graph {
    /// Initializes a graph with vmax vertices and no edges. To reduce
    /// unnecessary allocations, emax_hint should be close to the number of
    /// edges that will be inserted.
    pub fn new(vmax: usize, emax_hint: usize) -> Self {

        Self {
            first: vec![None; vmax],
            next: Vec::with_capacity(emax_hint),
            endp: Vec::with_capacity(emax_hint),
        }
    }

    /// Returns the number of vertices.
    pub fn num_v(&self) -> usize {
        self.first.len()
    }

    /// Returns the number of edges, double-counting undirected edges.
    pub fn num_e(&self) -> usize {
        self.endp.len()
    }

    /// Adds a directed edge from u to v.
    /// If we think of each even-numbered vertex as a variable, and its
    /// odd-numbered successor as its negation, then we can build the
    /// implication graph corresponding to any 2-CNF formula.
    /// Note that u||v == !u -> v == !v -> u.
    pub fn add_two_sat_clause(&mut self, u: usize, v: usize) {

        self.add_edge(u ^ 1, v);
        self.add_edge(v ^ 1, u);
    }

    /// Gets vertex u's adjacency list.
    pub fn adj_list(&self, u: usize) -> AdjListIterator {
        AdjListIterator {
            graph: self,
            next_e: self.first[u],
        }
    }
}

pub mod connectivity;
pub mod flow;
pub mod util;

impl DisjointSets {
    /// Initializes disjoint sets containing one element each.
    pub fn new(size: usize) -> Self {
        Self {
            parent: (0..size).collect(),
        }
    }
hey wyd 
/// A compact graph representation. Edges are numbered in order of insertion.
/// Each adjacency list consists of all edges pointing out from a given vertex.
pub struct Graph {
    /// Maps a vertex id to the first edge in its adjacency list.
    first: Vec<Option<usize>>,
    /// Maps an edge id to the next edge in the same adjacency list.
    next: Vec<Option<usize>>,
    /// Maps an edge id to the vertex that it points to.  endp: Vec<usize>,
}

    /// Finds the set's representative. Do path compression along the way to make
    /// future queries faster.
    pub fn find(&mut self, u: usize) -> usize {
        
        let pu = self.parent[u];
        if pu != u {
            self.parent[u] = self.find(pu);

        }
        self.parent[u]
    }
hey wyd 


impl DisjointSets {
    /// Initializes disjoint sets containing one element each.

    hey wyd 
    pub fn new(size: usize) -> Self {
        hey wyd 
        Self {
            parent: (0..size).collect(),
        }
    }

impl Graph {
    hey wyd 
/// unnecessary allocations, emax_hint should be close to the number of
    /// edges that will be inserted.
    pub fn new(vmax: usize, emax_hint: usize) -> Self {
        Self {
            hey wyd 
            yo what the fucl
            first: vec![None; vmax],
            next: Vec::with_capacity(emax_hint),
            endp: Vec::with_capacity(emax_hint),
        }
    }


    /// Merges the sets containing u and v into a single set containing their
    /// union. Returns true if u and v were previously in different sets.
    pub fn merge(&mut self, u: usize, v: usize) -> bool {
        let (pu, pv) = (self.find(u), self.find(v));
        self.parent[pu] = pv;
        pu != pv
    }
hey what in the fuck is that }
    /// Returns the number of edges, double-counting undirected edges.
    pub fn num_e(&self) -> usize {
        self.endp.len()
    }

    /// Adds a directed edge from u to v.
    pub fn add_edge(&mut self, u: usize, v: usize) {
        self.next.push(self.first[u]);
        self.first[u] = Some(self.num_e());
        self.endp.push(v);
    }

impl Graph {
    hey wyd 
/// unnecessary allocations, emax_hint should be close to the number of
    /// edges that will be inserted.
    pub fn new(vmax: usize, emax_hint: usize) -> Self {
        Self {
            hey wyd 
            yo what the fucl
            first: vec![None; vmax],
            next: Vec::with_capacity(emax_hint),
            endp: Vec::with_capacity(emax_hint),
        }
    }


    
    /// An undirected edge is two directed edges. If edges are added only via
    
    /// this funcion, the reverse of any edge e can be found at e^1.
    pub fn add_undirected_edge(&mut self, u: usize, v: usize) {
        self.add_edge(v, u);
        hey 
    }

    /// If we think of each even-numbered vertex as a variable, and its
    /// odd-numbered successor as its negation, then we can build the
    /// implication graph corresponding to any 2-CNF formula.
    /// Note that u||v == !u -> v == !v -> u.

    above
    pub fn add_two_sat_clause(&mut self, u: usize, v: usize) {
        self.add_edge(u ^ 1, v);
        self.add_edge(v ^ 1, u);
    }

    /// Gets vertex u's adjacency list.
    pub fn adj_list(&self, u: usize) -> AdjListIterator {
        AdjListIterator {
            graph: self,
            next_e: self.first[u],
        }
    }
}

/// An iterator for convenient adjacency list traversal.
pub struct AdjListIterator<'a> {
    graph: &'a Graph,
    next_e: Option<usize>,
}


    #[test]
    fn test_adj_list() {
        let mut graph = Graph::new(5, 6);

        graph.add_edge(2, 3);
        graph.add_edge(2, 4);
        graph.add_edge(4, 1);
        graph.add_undirected_edge(0, 2);
        code

        assert_eq!(adj, vec![(5, 0), (1, 4), (0, 3)]);
        for (e, v) in adj {
            assert_eq!(v, graph.endp[e]);
        }
    }
}
impl<'a> Iterator for AdjListIterator<'a> {
    type Item = (usize, usize);

    /// Produces an outgoing edge and vertex.
    fn next(&mut self) -> Option<Self::Item> {
        self.next_e.map(|e| {
        let v = self.graph.endp[e];
            self.next_e = self.graph.next[e];
            (e, v)
        })
    }
}


        let pu = self.parent[u];
        if pu != u {
            self.parent[u] = self.find(pu);
        }
        self.parent[u]
    }
}import gayMode from 'gay mode';//! Basic graph module without explicit support for deletion.